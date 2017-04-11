import React from 'react'

import HomeNav from './components/homeNav.js'
import ExpenseForm from './components/createExpenseForm.js'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'

var AddExpensePage = React.createClass({
	componentWillMount: function() {
		ACTIONS._getHouseExpenses()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	componentWillUnmount: function() {
		STORE.off('dataUpdated')
	},
	getInitialState: function() {
		return STORE.data
	},
	render: function() {
		return (
			<div>
				<HomeNav />
					<div className="main-container">
						<br/>
						<ExpenseForm />
						<br/>
						<ShowExpenses myExpenses={STORE.get('houseExpenses')}/>
					</div>
			</div>
			)
	}
})

var ShowExpenses = React.createClass({
	_listExpenses: function(model) {
		return <MakeList listItem={model} />
	},
	render: function() {
		return (
			<div className="expense-list">
				<p>House Expenses</p>
				<table className="expense-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Posted</th>
							<th>Category</th>
							<th>Amount</th>
							<th>Status</th>
							<th>Email</th>
							<th></th>
						</tr>
					</thead>
					{this.props.myExpenses.map(this._listExpenses)}
				</table>
			</div>
			)
	}
})

var MakeList = React.createClass({
	_isPaid: function() {
		var isPaid = this.props.listItem.get('isPaid')
		if (isPaid === true) {
			return 'Paid '
		}
		return 'Unpaid '
	},
	_togglePaid: function() {
		var currentModel = this.props.listItem,
			paidState = this.props.listItem.get('isPaid')
		if (paidState === false) {
			ACTIONS.editExpense(currentModel, true)
		} else if (paidState === true) {
			ACTIONS.editExpense(currentModel, false)
		}
	},
	_remove: function() {
		var currentModel = this.props.listItem
		ACTIONS.deleteExpense(currentModel)
	},
	_getDate: function() {
		var date = this.props.listItem.get('createdAt'),
			month = [date.slice(5,6), date.slice(6,7)],
			day = [date.slice(8,9), date.slice(9,10)],
			cal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
			finalMonth = '',
			finalDay = ''
		if (month[1] < 10) {
			var currentMonth = (month[1]) - 1
			finalMonth = cal[currentMonth]
		}
		else if (month[0] === 1) {
			var currentMonth = (month[1]) - 1
			finalMonth = cal[currentMonth]
		}
		else if (month[0] === 0 && month[1] === 0) {
			finalMonth = cal[1]
		}

		if (day[0] > 0) {
			finalDay = day.join('')
		} 
		else {
			finalDay = day[1]
		}
		return finalMonth+ ' ' +finalDay
	},
	render: function() {
		var expense = this.props.listItem,
			paidExpense = (this.props.listItem.get('isPaid')) ? "table-paid" : "table-unpaid",
			date = expense.get('createdAt')
		return (
			<tbody>
				<tr>
					<td>{expense.get('debtor').name}</td>
					<td>{this._getDate()}</td>
					<td>{expense.get('category')}</td>
					<td>$ {expense.get('amount')}</td>
					<td>{this._isPaid()} 
						<i className={`material-icons ${paidExpense}`} onClick={this._togglePaid}>check_circle</i>
					</td>
					<td>
						<a href={`mailto:${expense.get('debtor').email}?subject=You owe me money dude..&body=$${expense.get('amount')} for ${expense.get('category')}`}><i className="material-icons">mail_outline</i></a>
					</td>
					<td className="table-delete">
						<i className="material-icons table-trash" onClick={this._remove}>delete_forever</i>
					</td>
				</tr>
			</tbody>
			)
	}
})

export default AddExpensePage