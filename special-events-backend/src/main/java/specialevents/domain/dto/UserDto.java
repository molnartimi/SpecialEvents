package specialevents.domain.dto;

public class UserDto {
	private String username;
	private String password;
	private String fullName;

	public UserDto(){}

	public UserDto(String username, String fullName, String password) {
		this.username = username;
		this.fullName = fullName;
		this.password = password;
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
}
