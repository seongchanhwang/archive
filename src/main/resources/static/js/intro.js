(() => {
	let yOffset = 0;
	let prevScrollHeight = 0; // 이전 section 높이의 합
	let currentScene = 0; // 현재 보고있는 section
	const sceneInfo = [
		{
			type: 'sticky',
			heightNum: 5, // 브라우저 높이의 5배 설정
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-0'),
				messageA: document.querySelector('#scroll-section-0 .main-message.a'),
				messageB: document.querySelector('#scroll-section-0 .main-message.b'),
				messageC: document.querySelector('#scroll-section-0 .main-message.c'),
				messageD: document.querySelector('#scroll-section-0 .main-message.d')
			},
			values: {
				messageA_opacity: [0, 1]
			}
		},
		{
			type: 'normal',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1')
			}
		},
		{
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2')
			}
		},
		{
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3')
			}
		}
	]
	function setLayout() {
		// 각 스크롤 섹션의 높이 설정
		sceneInfo.forEach(element => {
			element.scrollHeight = element.heightNum * window.innerHeight;
			element.objs.container.style.height = `${element.scrollHeight}px`
		});

		yOffset = window.pageYOffset;
		let totalScrollHeight = 0;
		for (let i = 0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
		document.body.setAttribute('id', `show-scene-${currentScene}`)
	}

	function calcValues(values, currentYoffset) {
		let rv;
		let scrollRatio = currentYoffset / sceneInfo[currentScene].scrollHeight;
		rv = scrollRatio * (values[1] - values[0]) + values[0];
		return rv;
	}

	function playAnimation() {
		const objs = sceneInfo[currentScene].objs
		const values = sceneInfo[currentScene].values
		const currentYoffset = yOffset - prevScrollHeight;
		switch (currentScene) {
			case 0:
				let messageA_opacity_in = calcValues(values.messageA_opacity, currentYoffset)
				objs.messageA.style.opacity = messageA_opacity_in;
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
		}
	}

	function scrollLoop() {
		prevScrollHeight = 0;
		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}
		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			currentScene++;
			document.body.setAttribute('id', `show-scene-${currentScene}`)
		}
		if (yOffset < prevScrollHeight) {
			if (currentScene === 0) {
				// 모바일에서 yOffset이 마이너스가 되는것을 방지
				return false;
			}
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`)
		}

		playAnimation();
	}


	window.addEventListener('scroll', () => {
		yOffset = window.pageYOffset;
		scrollLoop();
	})

	// window.addEventListener('DOMContentLoaded', setLayout);
	window.addEventListener('load', setLayout);
	window.addEventListener('resize', setLayout);


})();