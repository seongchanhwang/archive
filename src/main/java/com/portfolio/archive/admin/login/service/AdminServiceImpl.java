package com.portfolio.archive.admin.login.service;

import com.portfolio.archive.admin.login.domain.Admin;
import com.portfolio.archive.admin.login.mapper.AdminMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Slf4j
@Service
public class AdminServiceImpl implements AdminService {

    private final AdminMapper adminMapper;

    @Autowired
    public AdminServiceImpl(AdminMapper adminMapper) {
        this.adminMapper = adminMapper;
    }

    @Override
    public String login(Admin admin, HttpSession session) {
        String result ;

        // userName이 존재하는지 확인
        if(validation(admin)){
            if(loginCheck(admin)){
                // ID/PW 일치할 경우 세션에 admin 정보 저장
                session.setAttribute("admin" , admin);
                return result = "success";
            }else {
                // 일치하지 않을 경우
                return result = "아이디 또는 비밀번호가 일치하지 않습니다.";
            }
        }else{
            return result = "존재하지 않는 계정입니다.";
        }
    }

    @Override
    public void logout(HttpSession session) {

    }

    public boolean validation(Admin admin){
        return adminMapper.findByName(admin).isPresent();
    }

    public boolean loginCheck(Admin admin){
        return adminMapper.loginCheck(admin).isPresent();
    }

}
