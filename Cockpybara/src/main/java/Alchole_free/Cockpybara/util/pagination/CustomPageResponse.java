package Alchole_free.Cockpybara.util.pagination;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class CustomPageResponse <T> {

    private List<T> content;

    private int currentPage;
    private int nextPage;
    private int prevPage;
    private int pageSize;
    private int totalPage;
    private long totalElements;

    public CustomPageResponse(Page page){
        this.currentPage=page.getNumber();
        this.nextPage=page.hasNext()?page.nextPageable().getPageNumber(): Integer.MAX_VALUE;
        this.prevPage=page.hasPrevious()?page.previousPageable().getPageNumber():-1;
        this.pageSize=page.getSize();
        this.totalPage=page.getTotalPages();
        this.totalElements=page.getTotalElements();
    }

    public void setContent(List<T> content) {
        this.content = content;
    }
}
