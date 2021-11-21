import { NgModule } from '@angular/core';
import { AbilityModule } from '@casl/angular';
import { Ability, PureAbility } from '@casl/ability';



@NgModule({
  declarations: [],
  imports: [
    AbilityModule
  ],
  providers: [
    {
      provide: Ability,
      useValue: new Ability()
    },
    {
      provide: PureAbility,
      useExisting: Ability
    }
  ],
  exports: [
    AbilityModule
  ]
})
export class PlatformAbilityModule { }
