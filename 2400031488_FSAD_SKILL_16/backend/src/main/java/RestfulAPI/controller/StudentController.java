package RestfulAPI.controller;

import java.util.List;
import RestfulAPI.model.Student;
import RestfulAPI.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/students")
@Tag(name = "Student CRUD APIs", description = "Operations for managing student records")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @Operation(
            summary = "Add a new student",
            description = "Creates a new student record and stores it in the database."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Student created successfully",
                    content = @Content(schema = @Schema(implementation = Student.class))),
            @ApiResponse(responseCode = "400", description = "Validation failed",
                    content = @Content(schema = @Schema(implementation = RestfulAPI.dto.ApiError.class)))
    })
    @PostMapping
    public ResponseEntity<Student> addStudent(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Student payload",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = Student.class),
                            examples = @ExampleObject(
                                    name = "Student Example",
                                    value = """
                                            {
                                              "name": "Ananya Sharma",
                                              "email": "ananya.sharma@example.com",
                                              "course": "Full Stack Application Development"
                                            }
                                            """
                            )
                    )
            )
            @Valid @org.springframework.web.bind.annotation.RequestBody Student student) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.addStudent(student));
    }

    @Operation(
            summary = "Retrieve all students",
            description = "Returns the complete list of students stored in the database."
    )
    @ApiResponse(responseCode = "200", description = "Students fetched successfully",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = Student.class))))
    @GetMapping
    public ResponseEntity<List<Student>> getStudents() {
        return ResponseEntity.ok(service.getAllStudents());
    }

    @Operation(
            summary = "Retrieve a student by ID",
            description = "Fetches a single student record using the provided id."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Student fetched successfully",
                    content = @Content(schema = @Schema(implementation = Student.class))),
            @ApiResponse(responseCode = "404", description = "Student not found",
                    content = @Content(schema = @Schema(implementation = RestfulAPI.dto.ApiError.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(
            @Parameter(description = "Student id", example = "1") @PathVariable Long id) {
        return ResponseEntity.ok(service.getStudentById(id));
    }

    @Operation(
            summary = "Update a student",
            description = "Updates an existing student record by id."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Student updated successfully",
                    content = @Content(schema = @Schema(implementation = Student.class))),
            @ApiResponse(responseCode = "400", description = "Validation failed",
                    content = @Content(schema = @Schema(implementation = RestfulAPI.dto.ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Student not found",
                    content = @Content(schema = @Schema(implementation = RestfulAPI.dto.ApiError.class)))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @Parameter(description = "Student id", example = "1") @PathVariable Long id,
            @Valid @org.springframework.web.bind.annotation.RequestBody Student student) {
        return ResponseEntity.ok(service.updateStudent(id, student));
    }

    @Operation(
            summary = "Delete a student",
            description = "Deletes an existing student record using the provided id."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Student deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Student not found",
                    content = @Content(schema = @Schema(implementation = RestfulAPI.dto.ApiError.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(
            @Parameter(description = "Student id", example = "1") @PathVariable Long id) {
        service.deleteStudent(id);
        return ResponseEntity.ok("Deleted Successfully");
    }
}
