import React from 'react';

class CustomModal extends React.Component {
  handleRemove = () => {
    this.props.onRemove();
  }

  handleSave = () => {
    const fullname = this.fullname.value;
    const phone = this.phone.value;
    this.props.onSave({
      fullname,
      phone,
    });
  }


  render() {
    const {
      fullname,
      phone,
      start,
      end,
      actionType
    } = this.props;

    const startHour = start.hour();
    const endHour = end.hour() <= 17 ? end.hour() : 17;

    const duration = endHour - startHour;
    const action = actionType === "create" ? "Book" : "Update"

    return (
      <div className="customModal">
        <div className="customModal__text">{`${action} the apointment in some place from ${start.format('HH:mm')} on ${duration} hours for ${duration * 10}$`}</div>
        <div>This is great choice</div>
        <input
          ref={el => this.fullname = el}
          className="customModal__input"
          type="text"
          placeholder="Full name"
          defaultValue={fullname}
        />
        <input
          ref={el => this.phone = el}
          className="customModal__input"
          type="text"
          placeholder="Phone number"
          defaultValue={phone}
        />
        <button className="customModal__button customModal__button_example" onClick={this.handleSave}>{action}</button>
      </div>
    );
  }
}

export default CustomModal;
