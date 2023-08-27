package Alchole_free.Cockpybara.util.pagination;

import lombok.Getter;

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

    public CustomPageResponse(int currentPage, int nextPage, int prevPage,
                              int pageSize, int totalPage, long totalElements) {
        this.currentPage = currentPage;
        this.nextPage = nextPage;
        this.prevPage = prevPage;
        this.pageSize = pageSize;
        this.totalPage = totalPage;
        this.totalElements = totalElements;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }
}
