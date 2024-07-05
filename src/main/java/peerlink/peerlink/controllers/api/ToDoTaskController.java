package peerlink.peerlink.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import peerlink.peerlink.dto.TasksDto;
import peerlink.peerlink.security.Response;
import peerlink.peerlink.services.ToDoTaskService;

import java.util.List;

@RestController
public class ToDoTaskController {
    @Autowired
    private ToDoTaskService taskService;

    @PostMapping("/api/getTasks")
    private List<String> getTasks(@RequestBody String username) {
        return taskService.getTasks(username);
    }

    @PostMapping(value = "/api/addTasks", consumes = "application/json")
    private Response addTasks(@RequestBody TasksDto tasks) {
        return taskService.addTasks(tasks) == null ? Response.responseSuccess()
                : Response.serverError();
    }
}
