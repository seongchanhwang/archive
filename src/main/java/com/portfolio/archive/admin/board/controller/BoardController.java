package com.portfolio.archive.admin.board.controller;

import com.portfolio.archive.admin.board.dto.BoardForm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@Controller
public class BoardController {

    @GetMapping("/admin/board/moveDetail")
    public String moveDetail(){
        return "/admin/board/detailView";
    }

    @PostMapping("/admin/board/createBoard")
    public String create(BoardForm form){

        return null;
    }

    @PostMapping("/admin/board/delete")
    public String delete(){
        return null;
    }

    @PostMapping("/admin/board/update")
    public String update(){
        return null;
    }


}
