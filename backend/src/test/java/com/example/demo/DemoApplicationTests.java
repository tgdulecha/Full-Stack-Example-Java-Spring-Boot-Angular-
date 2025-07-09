import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.junit.jupiter.api.Test;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")

class DemoApplicationTests {

    @Test
    void contextLoads() {
    }

}
