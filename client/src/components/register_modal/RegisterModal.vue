<template lang="html">
	<sui-modal class="login-modal-container" v-model="open">
		<sui-modal-header>Register As Operator</sui-modal-header>
		<sui-modal-content>
			<sui-message>
      <sui-message-header>SMS Notifications</sui-message-header>
      <p>
        As of now, all operator SMS notifications will go to the developers cell, regardless of the number you input here. You will only recieve SMS notifications from the customer point of view at the number you input when checking out your cart.
      </p>
    </sui-message>
			<sui-modal-description class="error" v-show="registerFailed"
				>{{registerFailed}}</sui-modal-description
			>
			<sui-form>
				<sui-form-fields>
				<sui-form-field center>
						<label>Name</label>
						<sui-input
							class="login-input"
							v-model="name"
							@keyup.enter="attemptRegister()"
							placeholder="Name"
							required
						></sui-input>
					</sui-form-field>
					<sui-form-field center>
						<label>Email</label>
						<sui-input
							class="login-input"
							v-model="email"
							@keyup.enter="attemptRegister()"
							placeholder="Email"
							required
						></sui-input>
					</sui-form-field>
					<sui-form-field center>
						<label>Mobile</label>
						<sui-input
							type="tel"
              placeholder="1112223333"
              minlength="10"
              maxlength="10"
							class="login-input"
							v-model="mobile"
							@keyup.enter="attemptRegister()"
							required
						></sui-input>
					</sui-form-field>
					<sui-form-field>
						<label>Password</label>
						<sui-input
							class="login-input"
							v-model="password"
							type="password"
							placeholder="Password"
							@keyup.enter="attemptRegister()"
							type="text"
							required
						></sui-input>
					</sui-form-field>
				</sui-form-fields>
			</sui-form>
		</sui-modal-content>
		<sui-modal-actions>
			<sui-button positive @click.native="attemptRegister()">
				Register
			</sui-button>
		</sui-modal-actions>
	</sui-modal>
</template>

<script>
import { registerAjaxCall } from '../../api/ajaxCalls';

export default {
	name: 'RegisterModal',
	props: {
		modalOpen: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			name: '',
			email: '',
			mobile: '',
			password: '',
			registerFailed: false
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
		attemptRegister() {
			this.registerFailed = false;
			if (this.name && this.email && this.mobile && this.password) {
				registerAjaxCall(
					this.name,
					this.email,
					this.mobile,
					this.password
				).then((response) => {
					if (response.status > 199 && response.status < 300) {
						this.emitClose();
						this.emitRegistered();
					} else {
						this.registerFailed =
							'Error registering. That email is probably taken.';
						setTimeout(() => {
							this.registerFailed = false;
						}, 4000);
					}
				});
			} else {
				this.registerFailed = 'Error registering. Please fill out all fields.';
				setTimeout(() => {
					this.registerFailed = false;
				}, 4000);
			}
		},
		emitClose() {
			this.$emit('closeModal');
		},
		emitRegistered() {
			this.$emit('registered');
		}
	}
};
</script>
