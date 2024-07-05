package peerlink.peerlink.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peerlink.peerlink.db.model.StudySession;
import peerlink.peerlink.db.repository.StudySessionRepository;

@Service
public class StudySessionService {
    @Autowired
    private StudySessionRepository repository;

    public List<StudySession> getAllStudySessions() {
        return repository.findAll();
    }

    public List<StudySession> getMyStudySessions(String username) {
        return repository.findSessionByUsername(username);
    }

    public void deleteStudySessionById(String id){
        repository.deleteById(id);
    }

    public StudySession createStudySession(StudySession session) {
        return repository.save(session);
    }

    public StudySession updateStudySession(StudySession updatedSession) {
        StudySession existingSession = repository.findById(updatedSession.getId()).get();
        existingSession.setDate(updatedSession.getDate());
        existingSession.setLocation(updatedSession.getLocation());
        return repository.save(existingSession);
    }
    
}
