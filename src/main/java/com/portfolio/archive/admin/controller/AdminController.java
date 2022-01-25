package com.portfolio.archive.admin.controller;

import com.portfolio.archive.admin.domain.Admin;
import com.portfolio.archive.admin.dto.AdminForm;
import com.portfolio.archive.admin.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

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
	@GetMapping("admin")
	public String main(Model model) {
		model.addAttribute("data", "chan");
		return "/admin/login";
	}

	/**
	 * 로그인
	 * userName, password를 AdminForm과 매핑해서 가져온 후 로그인 처리한다.
	 * @return
	 */
	@PostMapping("/admin/login")
	public String login(AdminForm form, HttpSession session){
		//1. pw와 name을 가져와서 model에 매핑한다.
		Admin admin = new Admin();
		log.info("userName: " + form.getUserName() );
		log.info("password: " + form.getpassword() );
		admin.setUserName(form.getUserName());
		admin.setpassword(form.getpassword());
		String resultMessage = service.login(admin,session);
		log.info("message :" + resultMessage);

		return "/admin/home";
	}

	/**
	 * 로그아웃
	 * 세션을 초기화한다.
	 * @return
	 */
	@PostMapping("admin/logut")
	public String logout(){

		return "/admin/login";
	}

}
