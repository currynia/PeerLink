package peerlink.peerlink.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import peerlink.peerlink.db.model.StudySession;
import peerlink.peerlink.dto.UserReq;
import peerlink.peerlink.services.StudySessionService;
import peerlink.peerlink.security.Response;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/studySession")
public class StudySessionController {

    @Autowired
    StudySessionService service;

    @GetMapping("/allSession")
    public List<StudySession> getAllStudySessions() {
        return service.getAllStudySessions();
    }

    @DeleteMapping("/deleteSession")
    public void deleteStudySessionById(@RequestBody StudySession session) {
        service.deleteStudySessionById(session.getId());
    }

    @PostMapping("/mySessions")
    public List<StudySession> getMyStudySessions(@RequestBody UserReq username) {
        return service.getMyStudySessions(username.getUsername());
    }

    @PostMapping("/addSession")
    public StudySession createStudySession(@RequestBody StudySession session) {
        return service.createStudySession(session);
    }

    @PutMapping("/updateSession")
    public StudySession updateStudySession(@RequestBody StudySession session) {
        return service.updateStudySession(session);
    }

}

