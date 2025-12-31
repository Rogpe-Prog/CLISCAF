import { Command } from "commander";

export function run() {
    const program = new Command();

    program
        .name("create-vertex-service")
        .description("CLI to scaffold Vertex AI services")
        .version("1.0.0");
    
    program
        .command("init")
        .description("Initialize a new Vertex Microservice")
        .action(() => {
            console.log("Initializing a new Vertex Microservice...");
        });

    program.parse(process.argv);
}