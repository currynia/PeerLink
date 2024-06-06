package peerlink.peerlink.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.db.repository.UserRepository;
import peerlink.peerlink.dto.TasksDto;

import java.util.List;

@Service
public class ToDoTaskService {
    @Autowired
    UserRepository userRepository;


    public List<String> getTasks(String username) {
        return userRepository.findUserTasks(username).getTasks();
    }

    public User addTasks(TasksDto tasks) {
        User user = userRepository.findUserByUsername(tasks.getUsername()).get();
        user.setTasks(tasks.getTasks());
        return userRepository.save(user);

    }
}
