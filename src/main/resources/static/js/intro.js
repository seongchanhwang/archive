(() => {
	let yOffset = 0; // window.pageYOffset 대신 쓸 변수
	let prevScrollHeight = 0;   // 현재 스크롤 위치보다 이전 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentSceen = 0; // 현재 활성화된 섹션 idx

	const sceneInfo = [
		{
			type: 'sticky',
			heihtNum: 5, // 브라우저 높이 n배 처리하기위한 변수
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-0')
			}
		},
		{
			type: 'normal',
			heihtNum: 5, // 브라우저 높이 n배 처리하기위한 변수
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1')
			}
		},
		{
			type: 'sticky',
			heihtNum: 5, // 브라우저 높이 n배 처리하기위한 변수
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2')
			}
		},
		{
			type: 'sticky',
			heihtNum: 5, // 브라우저 높이 n배 처리하기위한 변수
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3')
			}
		}
	]

	function setLayout() {
		// 각 스크롤 섹션 높이 세팅
		for (let i = 0; i < sceneInfo.length; i++) {
			sceneInfo[i].scrollHeight = sceneInfo[i].heihtNum * window.innerHeight;
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`

		}
	}


	window.addEventListener('resize', setLayout)
	setLayout()

})();