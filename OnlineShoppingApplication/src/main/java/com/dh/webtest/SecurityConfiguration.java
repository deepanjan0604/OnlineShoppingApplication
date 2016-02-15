package com.dh.webtest;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.context.request.*;

import com.dh.webtest.model.Customer;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Autowired
	DataSource datasource;
	
//	@Autowired
//	Customer customer;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.httpBasic().and().authorizeRequests().antMatchers("/public/**").permitAll().antMatchers("/admin/**")
				.access("hasRole('ADMIN')").antMatchers("/public/**").access("hasRole('USER')").and().logout()
				.and().csrf().disable();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		

	auth.jdbcAuthentication()
				.dataSource(datasource)
				.usersByUsernameQuery("select username, password, role from users where username=?")
				.authoritiesByUsernameQuery("select username, authority from authority where username=?");
//				.rolePrefix("");

		
		auth.inMemoryAuthentication().withUser("admin").password("admin")
		.roles("ADMIN", "USER");
	}

/*public String BcryptDecoder(String password){
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if(email.equalsIgnoreCase(customer.getEmail()) && encoder.matches(password, customer.getPassword())){
        	if( encoder.matches(password, customer.getPassword())){
        	String status = "true";	
        	//userService.deactivateUserByID(customer.getCustomerId());
        //   RequestAttributes.addAttribute("successmsg", "Your account has been deactivated successfully.");
            model.setViewName("redirect:/logout");
        }else{
            //redirectAttributes.addFlashAttribute("errormsg", "Email or Password is incorrect");
            model.setViewName("redirect:/app/profile/deactivate");
        }return password;
	}*/
}
