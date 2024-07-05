    package peerlink.peerlink.db.model;
    import lombok.Getter;
    import lombok.Setter;
    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;

    @Setter
    @Getter
    @Document("Sessions")
    public class StudySession {
        @Id
        private String id;
        private String date;
        private String location;
        private String user;
        
        public StudySession() {
        }
    }
