package com.portfolio.archive.admin.service;

import com.portfolio.archive.admin.domain.Admin;
import com.portfolio.archive.admin.mapper.AdminMapper;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@MybatisTest
public class AdminServiceTest {

    @Autowired
    private AdminMapper adminMapper;

    @Test
    public void loginTest(){
        Admin admin = new Admin();
        admin.setUserName("chan");

        Optional<Admin> result  = adminMapper.findByName(admin);

        assertThat(result.get().getId()).isEqualTo(1);

    }



}