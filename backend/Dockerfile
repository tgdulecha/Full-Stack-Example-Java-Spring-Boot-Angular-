FROM maven:3.9.8-eclipse-temurin-17-alpine AS builder

WORKDIR /app
COPY . .
RUN apk update && apk upgrade --no-cache && mvn clean install -DskipTests

# Stage 2: Run the app using lightweight JRE 17
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN apk update && apk upgrade --no-cache
COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]