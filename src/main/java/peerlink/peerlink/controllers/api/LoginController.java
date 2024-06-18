package peerlink.peerlink.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import peerlink.peerlink.db.model.User;
import peerlink.peerlink.dto.UserDto;
import peerlink.peerlink.security.Response;
import peerlink.peerlink.security.jwt.JwtToken;
import peerlink.peerlink.services.AuthenticationService;

@RestController
class LoginController {

  @Autowired AuthenticationService authService;

  @PostMapping(value = "/api/login", consumes = "application/json")
  private Response login(@RequestBody UserDto userDto) {
    try {

      Pair<User, JwtToken> userTokenPair =
          authService.authenticateLogin(userDto.getUsername(), userDto.getPassword());

      return Response.authenticationSuccess(userTokenPair.getFirst(), userTokenPair.getSecond());
    } catch (BadCredentialsException e) {
      return Response.loginFail();
    }
  }
}
