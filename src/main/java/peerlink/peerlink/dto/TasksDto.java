package peerlink.peerlink.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TasksDto {
    private String username;
    private List<String> tasks;
}
