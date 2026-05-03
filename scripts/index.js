const menuPopover = document.querySelector('[popover]')
let firstOpen = true

window.addEventListener('load', () => {
	menuPopover.showPopover()
	if (firstOpen) {
		document.querySelector('[popovertargetaction="hide"]').style.visibility =
			'hidden'
		firstOpen = false
	}
})

document.querySelector('button:first-child').addEventListener('click', () => {
	document.querySelector('[popovertargetaction="hide"]').style.visibility =
		'visible'
})

function displayIcons(type) {
	return `
    <img src="images/types-icons/${type}.png" alt="${type} type icon" class="${type}" />
  `
}

fetch('https://pokeapi.co/api/v2/type')
	.then(response => response.json())
	.then(data => {
		const types = data.results
			.map(result => {
				if (result.name !== 'stellar' && result.name !== 'unknown') {
					return displayIcons(result.name)
				}
			})
			.join('')

		document.querySelector('.all-types').innerHTML = types

		document.querySelectorAll('.all-types img').forEach(image => {
			image.addEventListener('click', function (e) {
				let showIcon = document.querySelector('.type')
				let clickedType = e.target.getAttribute('class')

				menuPopover.hidePopover()
				showIcon.innerHTML = `
          <h2>Type:</h2>
          ${displayIcons(clickedType)}
        `

				fetch(`https://pokeapi.co/api/v2/type/${clickedType}`)
					.then(response => response.json())
					.then(data => {
						const objectKeys = Object.keys(data.damage_relations)

						function selectIconContainer(key) {
							let iconContainer = document.querySelector(`.${key}`)
							let damageRelations = data.damage_relations[key]

							const relationTypes = damageRelations
								.map(damageRelation => displayIcons(damageRelation.name))
								.join('')

							iconContainer.innerHTML = relationTypes
						}

						objectKeys.forEach(key => selectIconContainer(key))
					})
			})
		})
	})

// document.querySelector('.back-arrow').addEventListener('click', function () {
// 	location.reload()
// })
