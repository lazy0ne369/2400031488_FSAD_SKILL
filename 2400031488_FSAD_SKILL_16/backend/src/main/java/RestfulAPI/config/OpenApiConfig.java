package RestfulAPI.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI studentCrudOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Skill 16 Student CRUD API")
                        .description("Swagger/OpenAPI documentation for the full-stack student CRUD backend.")
                        .version("1.0.0")
                        .contact(new Contact().name("FSAD Team")))
                .servers(List.of(new Server().url("http://localhost:8080").description("Local Development Server")));
    }
}
