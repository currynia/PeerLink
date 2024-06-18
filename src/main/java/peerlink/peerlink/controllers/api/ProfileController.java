package peerlink.peerlink.controllers.api;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import peerlink.peerlink.db.model.User;
import peerlink.peerlink.dto.Filter;
import peerlink.peerlink.dto.UserProfile;
import peerlink.peerlink.dto.UserReq;

import peerlink.peerlink.services.ProfileService;
@RestController
public class ProfileController {
    @Autowired
    private ProfileService profileService;

    @PostMapping("/api/getProfile")
    private User getProfile(@RequestBody UserReq username) {
        return profileService.getUser(username.getUsername());
    }

    @PostMapping("/api/updateProfile")
    private void updateProfile(@RequestBody UserProfile update) {
        profileService.updateUser(update);
    }
    
    @PostMapping("/api/filterProfile")
    private List<User> filterUser(@RequestBody Filter filter) {
        return profileService.filterUser(filter.getGender(), filter.getModules(), filter.getMajor());
    }
}
