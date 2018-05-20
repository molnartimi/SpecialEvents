package specialevents.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import specialevents.domain.dto.UserDto;
import specialevents.domain.user.UserEntity;
import specialevents.domain.user.UserRepository;

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
}
