package com.portfolio.archive.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class adminController {
	@GetMapping("admin")
	public String main(Model model) {
		model.addAttribute("data", "chan");
		return "/admin/login";
	}
}
