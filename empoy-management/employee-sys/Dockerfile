# Stage 1: Fetch JDK from the official OpenJDK image
FROM eclipse-temurin:21 AS jdk

# Stage 2: Build the final image
FROM debian:bookworm

# Java Installation and related settings
ENV JAVA_HOME=/opt/java/openjdk
COPY --from=jdk $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Install Supervisor
RUN apt-get update && apt-get install -y net-tools iputils-ping

EXPOSE 8080  

CMD ["java", "-jar", "target/employee-sys-0.0.1-SNAPSHOT.jar", "--spring.datasource.url=jdbc:mariadb://mariadb:3306/ems"]