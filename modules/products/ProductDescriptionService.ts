export class ProductDescriptionService {
  public static getShortDescription(description: string) {
    const descriptionCuttingPivot = 75;

    if (
      !description ||
      typeof description !== 'string' ||
      description === 'Temp'
    ) {
      return '';
    }

    if (description.length < descriptionCuttingPivot) {
      return description;
    }

    const closestCommaPosition = ProductDescriptionService.findClosestCommaPosition(
      description,
      descriptionCuttingPivot
    );
    let shortDescription = description.substring(
      0,
      (closestCommaPosition || descriptionCuttingPivot) + 1
    );

    if (!closestCommaPosition) {
      shortDescription = shortDescription + '...';
    }

    return shortDescription;
  }

  private static findClosestCommaPosition(
    description: string,
    startingPosition: number
  ) {
    let commaPosition = -1;

    while (commaPosition === -1 && startingPosition > 0) {
      commaPosition = description.indexOf('.', startingPosition);
      startingPosition -= 25;
    }

    return commaPosition === -1 ? undefined : commaPosition;
  }
}
