package com.portfolio.archive.admin.login.controller;

import com.portfolio.archive.admin.login.domain.Admin;
import com.portfolio.archive.admin.login.dto.AdminForm;
import com.portfolio.archive.admin.login.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@Slf4j
@Controller
public class AdminController {

	private final AdminService service;

	@Autowired
	public AdminController(AdminService service) {
		this.service = service;
	}

	/**
	 * 어드민페이지 view
	 * @param model
	 * @return
	 */
	@GetMapping("/admin")
	public String main(Model model) {
		model.addAttribute("data", "chan");
		return "/admin/login";
	}

	/**
	 * 로그인
	 * userName, password를 AdminForm과 매핑해서 로그인 처리한다.
	 * @return
	 */
	@PostMapping("/admin/login")
	public ModelAndView login(AdminForm form, HttpSession session, ModelAndView mv) {
		// 1. pw와 name을 가져와서 model에 매핑한다.
		Admin admin = new Admin();

		log.info("userName: " + form.getUserName());
		log.info("password: " + form.getpassword());

		admin.setUserName(form.getUserName());
		admin.setpassword(form.getpassword());

		// 성공이면 로그인페이지로 이동
		// 실패면 실패 메시지 전송
		// 실패 메시지 : 잘못된 아이디 또는 비밀번호입니다.

		String result = service.login(admin, session);
		if(result.equals("success")){
			mv.setViewName("redirect:/admin/home");
			log.info("message :" + result);
			return mv;
		}else{
			mv.setViewName("redirect:/admin");
			mv.addObject("errMsg",result);
			log.info("로그인 실패");
			return mv;
		}
	}

	/**
	 * 로그아웃
	 * 세션을 초기화한다.
	 * 
	 * @return
	 */
	@PostMapping("/admin/logut")
	public String logout() {

		return "/admin/login";
	}

	@GetMapping("/admin/home")
	public String adminHome(AdminForm form, HttpSession session) {
		return "/admin/home";
	}
}
