package RestfulAPI.service;

import java.util.List;
import RestfulAPI.model.Student;
import RestfulAPI.exception.ResourceNotFoundException;
import RestfulAPI.repository.StudentRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public Student addStudent(Student student) {
        return repo.save(student);
    }

    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    public Student getStudentById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public Student updateStudent(Long id, Student student) {
        Student existing = getStudentById(id);
        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setCourse(student.getCourse());
        return repo.save(existing);
    }

    public void deleteStudent(Long id) {
        Student existing = getStudentById(id);
        repo.delete(existing);
    }
}
