import { connect } from 'react-redux';
import { LogoutView, mapStateToProps, mapDispatchToProps } from './LogoutView';

export default connect(mapStateToProps, mapDispatchToProps)(LogoutView);
