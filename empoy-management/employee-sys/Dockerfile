# Stage 1: Fetch JDK from the official OpenJDK image
FROM eclipse-temurin:21 AS jdk

# Stage 2: Build the final image
FROM debian:bookworm

# Java Installation and related settings
ENV JAVA_HOME=/opt/java/openjdk
COPY --from=jdk $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Install Supervisor
RUN apt-get update && apt-get install -y supervisor net-tools iputils-ping && mkdir -p /var/log/supervisor

# # Copy the supervisor configuration file
# COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# # Copy the script that monitors and runs the most recent jar and make it executable
# COPY run_jar.sh /usr/local/bin/run_jar.sh
# RUN chmod +x /usr/local/bin/run_jar.sh

# Expose port 8080 to other containers within the same Docker network (no host mapping)
EXPOSE 8080  

# Set the entrypoint to Supervisor
# CMD ["/usr/bin/supervisord"]
CMD ["java", "-jar", "target/employee-sys-0.0.1-SNAPSHOT.jar", "--spring.datasource.url=jdbc:mariadb://mariadb:3306/ems"]