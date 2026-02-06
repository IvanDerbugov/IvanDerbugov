export class Mutant {
    constructor(config) {
        this.type = config.type;
        this.attributes = config.attributes || {};
        this.styles = config.styles || {};
        this.innerHTML = config.innerHTML || '';
        this.isImg = config.isImg || false;
        this.src = config.src || '';
        this.alt = config.alt || this.type;
        this.canWalk = config.canWalk !== undefined ? config.canWalk : true;
    }

    render() {
        let element;

        if (this.isImg) {
            element = document.createElement('img');
            element.src = this.src;
            element.alt = this.alt;
        } else {
            element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            
            // Default SVG attributes
            const defaultSvgAttrs = {
                'version': '1.1',
                'xmlns': 'http://www.w3.org/2000/svg',
                'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                'xml:space': 'preserve'
            };

            // Apply defaults then overrides
            const allAttrs = { ...defaultSvgAttrs, ...this.attributes };
            for (const [key, value] of Object.entries(allAttrs)) {
                element.setAttribute(key, value);
            }

            if (this.innerHTML) {
                element.innerHTML = this.innerHTML;
            }
        }

        // Add canWalk as a data attribute for logic in other files
        element.dataset.canWalk = this.canWalk;

        // Default styles for all mutants
        const defaultStyles = {
            position: 'absolute',
            left: '0',
            top: '0'
        };

        // Apply styles
        const allStyles = { ...defaultStyles, ...this.styles };
        for (const [key, value] of Object.entries(allStyles)) {
            element.style[key] = value;
        }

        return element;
    }
}
