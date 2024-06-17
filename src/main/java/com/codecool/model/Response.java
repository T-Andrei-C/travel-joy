package com.codecool.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Response {
    private String content;
    private String type;
    private Object object;
}
