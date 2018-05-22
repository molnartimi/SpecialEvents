package specialevents.domain.user;

public class UserDto {
	private long id;
	private String username;
	private String password;
	private String fullName;
	private String role;

	public UserDto(){}

	public UserDto(long id, String username, String fullName, String password, String role) {
		this.id = id;
		this.username = username;
		this.fullName = fullName;
		this.password = password;
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUserName(String name) {
		this.username = name;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String name) {
		this.fullName = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
