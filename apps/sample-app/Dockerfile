FROM eclipse-temurin:21 as builder
WORKDIR application
COPY ./gradlew .
COPY ./gradle gradle
COPY ./build.gradle .
COPY ./settings.gradle .
COPY ./src src
RUN ./gradlew build --no-daemon -x test

FROM eclipse-temurin:21
COPY --from=builder application/build/libs/demo-0.0.1-SNAPSHOT.jar application.jar
ENTRYPOINT ["java","-jar","application.jar"]
