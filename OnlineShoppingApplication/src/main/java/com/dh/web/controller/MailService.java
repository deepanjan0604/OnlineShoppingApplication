/*package com.dh.web.controller;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import com.dh.web.controller.ApplicationMailer;

public class MailService {
	public static void init(String to, String subject, String body) 
    {
        //Create the application context
      ApplicationContext context = new FileSystemXmlApplicationContext("src/main/resources/application-context.xml");
         
        //Get the mailer instance
        ApplicationMailer mailer = (ApplicationMailer) context.getBean("mailService");
 
        //Send a composed mail
        mailer.sendMail(to,"Mail Verification",body);
 
        //Send a pre-configured mail
        mailer.sendPreConfiguredMail("Mail succesfully sent");
    }

}
*/