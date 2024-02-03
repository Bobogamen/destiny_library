package com.destinylibrary.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RedirectController {

    @RequestMapping("/**")  // Handle all requests
    public String redirectToTarget() {
        String redirectUrl = "https://destiny-library.netlify.app/";
        return "redirect:" + redirectUrl;
    }
}
