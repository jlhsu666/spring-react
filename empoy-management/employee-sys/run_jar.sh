JAR_DIR="/usr/share1/target"
CURRENT_JAR=""
LAST_MOD_TIME=0

# Function to run the most recent jar file
run_jar() {
    NEW_JAR=$(ls -t "$JAR_DIR"/*.jar 2>/dev/null | head -n 1)
    if [[ -z "$NEW_JAR" ]]; then
        echo "No JAR files found in $JAR_DIR. Waiting for a new file..."
        return
    fi

    NEW_MOD_TIME=$(stat -c %Y "$NEW_JAR")
    
    if [[ "$NEW_JAR" != "$CURRENT_JAR" ]] || [[ "$NEW_MOD_TIME" -gt "$LAST_MOD_TIME" ]]; then
        echo "New or updated JAR file found: $NEW_JAR. Restarting process."
        
        # Kill the existing Java process if running
        pkill -f 'java -jar' || true
        
        # Run the new JAR file
        java -jar "$NEW_JAR" &
        
        # Update the current jar and its modification time
        CURRENT_JAR="$NEW_JAR"
        LAST_MOD_TIME="$NEW_MOD_TIME"
    fi
}

# Monitor loop
while true; do
    run_jar
    sleep 10  # Check every 10 seconds for changes
done