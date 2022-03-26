package com.portfolio.archive.admin.login.mapper;

import com.portfolio.archive.admin.login.domain.Admin;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface AdminMapper {
    Optional<Admin> findByName(Admin admin);

    Optional<Admin> loginCheck(Admin admin);
}
