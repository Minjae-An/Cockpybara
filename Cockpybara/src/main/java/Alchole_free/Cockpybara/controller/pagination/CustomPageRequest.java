package Alchole_free.Cockpybara.controller.pagination;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class CustomPageRequest {
    @NotNull
    private int page;
    @NotNull
    private int size;
}
