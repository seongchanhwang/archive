(() => {
	let yOffset = 0;
	let prevScrollHeight = 0; // 이전 section 높이의 합
	let currentScene = 0; // 현재 보고있는 section
	let enterNewScene = false; // 새로운 section이 시작되는 순간 true
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
				messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
				messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
				messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],

				messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
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
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYoffset / sceneInfo[currentScene].scrollHeight;
		if (values.length === 3) {
			// start ~ end 사이에 애니메이션 실행
			const partScrollStart = values[2].start * scrollHeight;
			const partScrollEnd = values[2].end * scrollHeight;
			const partScrollHeight = partScrollEnd - partScrollStart;
			if (currentYoffset >= partScrollStart && currentYoffset <= partScrollEnd) {
				rv = (currentYoffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			} else if (currentYoffset < partScrollStart) {
				rv = values[0];
			} else if (currentYoffset > partScrollEnd) {
				rv = values[1];
			}

		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0];
		}
		return rv;
	}

	function playAnimation() {
		const objs = sceneInfo[currentScene].objs
		const values = sceneInfo[currentScene].values
		const currentYoffset = yOffset - prevScrollHeight;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYoffset / scrollHeight
		switch (currentScene) {
			case 0:
				const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYoffset)
				const messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYoffset)
				const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYoffset)
				const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYoffset)
				if (scrollRatio <= 0.22) {
					// in 
					objs.messageA.style.opacity = messageA_opacity_in;
					objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
				} else {
					// out 
					objs.messageA.style.opacity = messageA_opacity_out;
					objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;;
				}
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

		enterNewScene = false;
		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}
		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			enterNewScene = true;
			currentScene++;
			document.body.setAttribute('id', `show-scene-${currentScene}`)
		}
		if (yOffset < prevScrollHeight) {
			enterNewScene = true;
			if (currentScene === 0) {
				// 모바일에서 yOffset이 마이너스가 되는것을 방지
				return false;
			}
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`)
		}
		if (enterNewScene) {
			return false;
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