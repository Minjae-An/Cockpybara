package Alchole_free.Cockpybara.util.pagination;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomPageRequest {
    private int page;
    private int size;
}
