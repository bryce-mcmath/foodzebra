<template lang="html">
	<sui-modal class="login-modal-container" v-model="open">
		<sui-modal-header>Login</sui-modal-header>
		<sui-modal-content>
			<sui-modal-description class="error" v-show="loginFailed"
				>Invalid username or password</sui-modal-description
			>
			<sui-form>
				<sui-form-fields>
					<sui-form-field center>
						<label>Email</label>
						<sui-input
							class="login-input"
							v-model="email"
							@keyup.enter="submitCredentials()"
							placeholder="Email"
						></sui-input>
					</sui-form-field>
					<sui-form-field>
						<label>Password</label>
						<sui-input
							class="login-input"
							v-model="password"
							type="password"
							placeholder="Password"
							@keyup.enter="submitCredentials()"
							type="text"
							placeholder="Password"
						></sui-input>
					</sui-form-field>
				</sui-form-fields>
			</sui-form>
		</sui-modal-content>
		<sui-modal-actions>
			<sui-button positive @click.native="submitCredentials()">
				Login
			</sui-button>
		</sui-modal-actions>
	</sui-modal>
</template>

<script>
import { loginAjaxCall } from '../../api/ajaxCalls';

export default {
	name: 'LoginModal',
	props: {
		modalOpen: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			email: '',
			password: '',
			loginFailed: false
		};
	},
	computed: {
		open: {
			get: function() {
				return this.modalOpen;
			},
			set: function(newValue) {
				if (!newValue) this.emitClose();
			}
		}
	},
	methods: {
		submitCredentials() {
			this.loginFailed = false;
			loginAjaxCall(this.email, this.password).then((response) => {
				if (response.status > 199 && response.status < 300) {
					this.emitClose();
					this.emitLogin();
				} else {
					this.loginFailed = true;
					setTimeout(() => {
						this.loginFailed = false;
					}, 4000);
				}
			});
		},
		emitClose() {
			this.$emit('closeModal');
		},
		emitLogin() {
			this.$emit('loggedIn');
		}
	}
};
</script>
