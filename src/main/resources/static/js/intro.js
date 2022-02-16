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
				messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
				messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
				messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],

				messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
				messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
				messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],

				messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
				messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
				messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],

				messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
				messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
				messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
				messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
			}
		},
		{
			type: 'normal',
			// heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1'),
			}
		},
		{
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2'),
				messageA: document.querySelector('#scroll-section-2 .a'),
				messageB: document.querySelector('#scroll-section-2 .b'),
				messageC: document.querySelector('#scroll-section-2 .c'),
				pinB: document.querySelector('#scroll-section-2 .b .pin'),
				pinC: document.querySelector('#scroll-section-2 .c .pin')
			},
			values: {
				messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
				messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
				messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
				messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
				messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
				messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
				messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
				messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
				pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
				pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
			}
		},
		{
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3'),
				canvasCaption: document.querySelector('.canvas-caption')
			},
			values: {

			}
		}
	]

	function setLayout() {
		// 각 스크롤 섹션의 높이 설정
		sceneInfo.forEach(element => {
			if (element.type == 'sticky') {
				element.scrollHeight = element.heightNum * window.innerHeight;
			} else if (element.type == 'normal') {
				element.scrollHeight = element.objs.container.offsetHeight;
			}
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
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;

		switch (currentScene) {
			case 0:
				// console.log('0 play');
				console.log(calcValues(values.messageA_opacity_in, currentYOffset));
				if (scrollRatio <= 0.22) {
					// in
					let gytjq = document.querySelector(".profileImg");
					gytjq.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					gytjq.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.42) {
					// in
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.62) {
					// in
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.82) {
					// in
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
				}

				break;

			case 2:
				// console.log('2 play');
				if (scrollRatio <= 0.25) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.57) {
					// in
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				}

				if (scrollRatio <= 0.83) {
					// in
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				}

				break;

			case 3:
				// console.log('3 play');
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



	let mainVisual_txt = document.querySelector(".mainVisual_txt");
	mainVisual_txt.classList.add("on");


	let frontEnd = document.querySelector("#frontEnd");
	frontEnd.onclick = function () {

		window.scroll({
			top: sceneInfo[0].objs.messageA.offsetTop + 400,
			left: 0,
			behavior: 'smooth'
		});


	}

})();