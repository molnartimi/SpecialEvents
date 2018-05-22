package specialevents.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import specialevents.domain.dto.UserDto;
import specialevents.domain.user.UserEntity;
import specialevents.domain.user.UserRepository;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

/**
 * @author kamal berriga
 *
 */
@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	public UserEntity save(UserDto user) {
		UserEntity entity = new UserEntity(user.getUsername(), user.getPassword(), user.getFullName());
		entity.setRole("USER");
		return userRepository.saveAndFlush(entity);
	}

	public UserEntity update(UserEntity user) {
		return userRepository.save(user);
	}

	public UserEntity find(String userName) {
		return userRepository.findOneByUsername(userName);
	}

	public UserEntity find(Long id) {
		return userRepository.findById(id).get();
	}

	public UserDto getUser(Long id) {
		UserEntity entity = find(id);
		return new UserDto(entity.getId(), entity.getUsername(), entity.getFullName(), entity.getPassword(), entity.getRole());
	}

	public Set<UserDto> getUsers() {
		Set<UserDto> users = new HashSet<>();
		Iterable<UserEntity> entities = userRepository.findAll();
		for (UserEntity entity: entities) {
			users.add(new UserDto(entity.getId(), entity.getUsername(), entity.getFullName(), entity.getPassword(), entity.getRole()));
		}
		return users;
	}

	@Transactional
	public void edit(UserDto user) {
		UserEntity entity = userRepository.findById(user.getId()).get();
		if (entity != null) {
			entity.setUsername(user.getUsername());
			entity.setFullName(user.getFullName());
			if (user.getPassword() != null && !user.getPassword().equals(""))
				entity.setPassword(user.getPassword());
			entity.setRole(user.getRole());
		}
	}

	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}
}
