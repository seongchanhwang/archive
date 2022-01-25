package com.portfolio.archive.admin.service;

import com.portfolio.archive.admin.domain.Admin;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

public interface AdminService {
    /**
     * admin 계정에 login 한다.
     * @return
     */
    public String login(Admin admin, HttpSession session);

    public void logout(HttpSession session);
}
