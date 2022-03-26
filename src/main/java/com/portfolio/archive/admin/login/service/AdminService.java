package com.portfolio.archive.admin.login.service;

import com.portfolio.archive.admin.login.domain.Admin;

import javax.servlet.http.HttpSession;

public interface AdminService {
    /**
     * admin 계정에 login 한다.
     * @return
     */
    public String login(Admin admin, HttpSession session);

    /**
     * session에 저장된 admin 정보를 제거한다.
     * @param session
     */
    public void logout(HttpSession session);
}
