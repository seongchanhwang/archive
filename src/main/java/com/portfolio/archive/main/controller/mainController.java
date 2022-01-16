package com.portfolio.archive.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class mainController {
    @GetMapping("main")
    public String main(Model model){
        model.addAttribute("data", "chan");
        return "main";
    }


}
