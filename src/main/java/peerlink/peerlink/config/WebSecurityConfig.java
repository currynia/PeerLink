package peerlink.peerlink.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //remove all authentication for now
        return http.authorizeHttpRequests(request ->
                        request.requestMatchers(new AntPathRequestMatcher("/**"))
                                .permitAll()).csrf(AbstractHttpConfigurer::disable)//disable csrf for debugging
                .build();
    }
}
